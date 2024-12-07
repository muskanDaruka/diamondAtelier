"use client";
import useScrollPosition from "@/hooks/scrollRestoration";
import { useAppDispatch } from "@/redux/ReduxHook";
import { RiFindReplaceFill } from "react-icons/ri";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import React, {
  CSSProperties,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DraggableTableHeader } from "./DragabbleTableHeader";
import { ApproxPiece } from "@/helpers/CalculationFancy";

interface PropsType<T> {
  Tdata: T[] | null;
  Twidth?: string;
  column: ColumnDef<T, any>[];
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  isLoading?: boolean;
  fetchData?: any;
  resultCount: Dispatch<SetStateAction<number>>;
  selectedRow: (arg: Row<T>[]) => void;
  type: "holdResult" | "cartResult" | "searchResult";
}


let pageno = 1;

function DynamicResultTable<T>({
  Tdata,
  column,
  Twidth,
  setRowSelection,
  rowSelection,
  isLoading,
  fetchData,
  resultCount,
  selectedRow,
  type,
}: PropsType<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const tableContainerRef = useScrollPosition("resultPageScrollPosition");
  const { push } = useRouter();
  const pathname = usePathname();
  const [hasLoad, setHasLoadMore] = useState<boolean>(true);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() => []);
  const router = useRouter()
  const [saveInex, setSavedIndex] = useState({});


  const table = useReactTable({
    data: rows,
    columns: column,
    enableRowSelection: true,
    onRowSelectionChange: (value)=>{
      // localStorage.removeItem("index")
      setRowSelection(value);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    state: {
      rowSelection,
      sorting,
      columnOrder,
    },
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setRows((old: any) =>
          old.map((row: any, index: any) => {
            if (index === rowIndex) {
              const updatedRow = {
                ...old[rowIndex],
                [columnId]: value,
              };
              if (columnId === 'no_of_piece') {
                const approx_wgt = (value / Number(ApproxPiece(row?.SIZE_N)));
                const order_in_ct = (value / Number(ApproxPiece(row?.SIZE_N)));
                updatedRow['approx_weight'] = approx_wgt == 0 ? "": approx_wgt.toFixed(2);
                updatedRow['OIC'] = order_in_ct == 0 ? '': order_in_ct.toFixed(2);
              }
              if (columnId === "OIC") {
                const no_of_piece = value * Number(ApproxPiece(row?.SIZE_N))
                updatedRow['approx_weight'] = value;
                updatedRow['no_of_piece'] = no_of_piece == 0 ? "" : no_of_piece.toFixed();
              }
              if (columnId === "PRICE_RATE") {
                updatedRow['PRICE_RATE'] = value;
                
              }
              return updatedRow;
            }
            return row;
          })
        );
      },
    },
    columnResizeDirection: "ltr",
    columnResizeMode: "onChange",
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });


  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders()
    const colSizes: { [key: string]: number } = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!
      colSizes[`--header-${header.id}-size`] = header.getSize()
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
    }
    return colSizes
  }, [table.getState().columnSizingInfo, table.getState().columnSizing])
  

  const handleRowClick = async (row: any) => {
    await localStorage.setItem(
      "singleStoneDetail",
      JSON.stringify(row.original)
    );

    if (pathname == "/certifiedResult" || pathname == "/color-result/cs-colorResult") {
      push(`${pathname}/${row?.original?.PACKET_NO}`);
      localStorage.setItem("index",row.index);
    }
  };

  function isAtBottom({ currentTarget }: any) {
    return (
      currentTarget.scrollTop + 10 >=
      currentTarget.scrollHeight - currentTarget.clientHeight
    );
  }

  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (isLoading || hasLoad == false) {
      return;
    }
    const isVerticalScroll =
      event.currentTarget.scrollHeight > event.currentTarget.clientHeight;

    if (isLoading || !isAtBottom(event) || !isVerticalScroll) return;

    let filters = JSON.parse(localStorage.getItem("filters") || `{}`);
    pageno = pageno + 1;
    // router.push(`${pathname}?page=${pageno}`)
    await dispatch(fetchData({ ...filters, PAGENO: pageno }))
      .then((res: any) => res)
      .then((res: any) => {
        if (res?.payload?.data?.Table?.length == 0) {
          toast("No more data is available to fetch", {
            icon: <RiFindReplaceFill />,
          });
          setHasLoadMore(false);
        }
      });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        localStorage.setItem("columnOrder", JSON.stringify(arrayMove(columnOrder, oldIndex, newIndex)));
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const handleMouseEnter = () => {
    localStorage.removeItem("index");
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColumnOrder = JSON.parse(localStorage.getItem("columnOrder") || "[]");
      if (savedColumnOrder.length > 0) {
        setColumnOrder(savedColumnOrder);
      } else {
        setColumnOrder(column.map((c: any) => c.id!));
      }
    }
  }, [column]);

  useEffect(() => {
    if (Tdata) {
      const tableData = Tdata || [];
      setRows(tableData);
      resultCount(tableData.length);
    }
  }, [Tdata]);

  useEffect(() => {
    selectedRow(table.getSelectedRowModel().flatRows);
  }, [rowSelection]);


  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="w-[98%] mx-auto h-[75vh] mt-3" tabIndex={0}>
        <div
          className={`h-full w-full overflow-auto ${"active-scrollbar"
            }`}
          ref={tableContainerRef}
          onScroll={(e) => type == "searchResult" && handleScroll(e)}
        >
          <table
            className={`text-sm font-serif mx-auto border border-red`}
            {...{
              style: {
                ...columnSizeVars,
                width:  table.getTotalSize() || "2000",
              },
            }}
          >
            <thead className="sticky top-[-1px] bg-white z-[6] font-serif">
              {table?.getHeaderGroups()?.length > 0
                ? table?.getHeaderGroups()?.map((headerGroup) => (
                  <tr key={headerGroup.id} className="h-[30px] text-white font-serif">
                    <SortableContext
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      {headerGroup?.headers?.map((header, index) => (
                        <DraggableTableHeader
                          key={header.id}
                          header={header}
                          index={index}
                        />
                      ))}
                    </SortableContext>
                  </tr>
                ))
                : null}
            </thead>
            <tbody onMouseEnter={handleMouseEnter}>
              {table?.getRowModel()?.rows?.length > 0
                ? table?.getRowModel()?.rows?.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    className={` h-8 cursor-pointer group w-full font-serif`}
                  >
                    {row?.getVisibleCells()?.map((cell, index) => (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <DragAlongCell idx={idx} key={cell.id} cell={cell} index={index} row={row} />
                      </SortableContext>
                    ))}
                  </tr>
                ))
                : null}
            </tbody>
          </table>
          {isLoading && (
            <div className="absolute z-10 bottom-10 flex justify-center w-full h-[40px] mb-3 font-serif">
              <RotatingLines
                visible={true}
                width="90"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor="#2366c4"
              />
            </div>
          )}
          {table?.getRowModel()?.rows?.length == 0 && isLoading!==true ? (
            <div className="flex justify-center text-lg p-2 font-bold font-serif">
              No Data Found
            </div>
          ) : null}
        </div>
      </div>
    </DndContext>
  );
}

export default DynamicResultTable;



 const DragAlongCell = ({ cell, index, idx, row }: any) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });


  const columnWidths = [40, 65, 65];

  const stickyLeft = index < 4
    ? `${columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0)}px`
    : undefined;

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: index < 4 ? "sticky" : "relative",
    left: stickyLeft,
    zIndex: index < 4 ? 4 : 1,
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
  };

  useEffect(()=>{
    if(localStorage.getItem("index") == row.index){
      row.toggleSelected(true);
    }
  },[])

  return (
    <td
      key={cell.id}
      style={style}
      ref={setNodeRef}
      className={`border border-3 border-white text-center font-serif text-xs border-gray-200 ${idx % 2 == 0
          ? row.getIsSelected()
            ? "bg-[#2366C4] text-white font-serif"
            : "bg-[#ebebeb]"
          : row.getIsSelected()
            ? "bg-[#2366C4] text-white font-serif"
            : "bg-[#f5f5f5]"
        } group-hover:bg-[#2466c4] group-hover:text-white font-serif `}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
