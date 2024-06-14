import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductHistory({ history, onDelete, onProductSelect }) {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (productId) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null);
      onProductSelect(null);
    } else {
      setSelectedProductId(productId);
      onProductSelect(productId);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Portion</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Grams</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 && history.map((item, index) => (
            <TableRow
              key={item.id}
              onClick={() => handleProductSelect(item.id)}
              selected={selectedProductId === item.id}
              style={{
                backgroundColor: selectedProductId === item.id ? '#686868' : 'inherit',
                cursor: 'pointer'
              }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.portion}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.gram}</TableCell>
              <TableCell align="right">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering row click event
                    onDelete(item.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductHistory;
