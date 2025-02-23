"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { rowsToRender } from "./seedDevices";
import { ThemeProvider } from "@emotion/react";
import theme from "@/context/ThemeContext";
import SearchBar from "@/common/searchbar/SearchBar";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Data {
  id: number;
  marca: string;
  serie: string;
  modelo: string;
  nombre: string;
  ubicacion: string;
}

export function createData(
  id: number,
  nombre: string,
  marca: string,
  modelo: string,
  serie: string,
  ubicacion: string
): Data {
  return {
    id,
    nombre,
    marca,
    modelo,
    serie,
    ubicacion,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "nombre",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    id: "marca",
    numeric: true,
    disablePadding: false,
    label: "Marca",
  },
  {
    id: "modelo",
    numeric: true,
    disablePadding: false,
    label: "Modelo",
  },
  {
    id: "serie",
    numeric: true,
    disablePadding: false,
    label: "Serie",
  },
  {
    id: "ubicacion",
    numeric: true,
    disablePadding: false,
    label: "Ubicación",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                "&.Mui-active": {
                  color: "#fbfbfb",
                  "& .MuiTableSortLabel-icon": {
                    color: "#fbfbfb",
                  },
                },
                "&.MuiTableSortLabel-root": {
                  color: "#fbfbfb",
                },
              }}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          color: "inherit",
        },
        numSelected > 0 && {
          backgroundColor: "#394752",
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{
            flex: "1 1 100%",
          }}
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected === 1 ? "seleccionado" : "seleccionados"}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Inventario Equipos Biomédicos 2025
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("nombre");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([...rowsToRender]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      // Set the search term in the URL
      params.set("search", searchTerm);

      // Filter rows based on the search term
      const filteredRows = rowsToRender.filter((row) =>
        row.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRows(filteredRows);
    } else {
      // If the search term is empty, reset the rows and remove the search param
      params.delete("search");
      setRows([...rowsToRender]);
    }

    // Update the URL
    replace(`${pathname}?${params.toString()}`);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     [...rows]
  //       .sort(getComparator(order, orderBy))
  //       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [order, orderBy, page, rowsPerPage]
  // );

  const visibleRows = React.useMemo(() => {
    // Sort and paginate the rows
    return [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage, order, orderBy]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", p: 2, backgroundColor: "#1e1e1e" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              bgcolor: alpha("#1e1e1e", 1),
            }}
          >
            <SearchBar onSearch={handleSearch} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
              getItemAriaLabel={(type) => {
                if (type === "next") return "Página siguiente";
                if (type === "previous") return "Página anterior";
                return "";
              }}
              sx={{
                "& .Mui-disabled": {
                  "& .MuiSvgIcon-root": {
                    color: "#606060",
                  },
                },
                "& .MuiSelect-root": {
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            />
          </Box>

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        "&.Mui-selected": {
                          backgroundColor: "#303942",
                          "&:hover": {
                            backgroundColor: "#394752",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "#303030",
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left">{row.marca}</TableCell>
                      <TableCell align="left">{row.modelo}</TableCell>
                      <TableCell align="left">{row.serie}</TableCell>
                      <TableCell align="left">{row.ubicacion}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Reducir tamaño"
        />
      </Box>
    </ThemeProvider>
  );
}
