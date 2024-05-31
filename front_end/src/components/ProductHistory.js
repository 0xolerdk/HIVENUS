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

function ProductHistory({ history, onDelete, onProductSelect, onPortionSelect, onQuantitySelect, onGramsSelect, selectedProduct }) {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (product, index) => {
    const productId = `${product.fdcId}-${index}`;
    if (selectedProductId === productId) {
      setSelectedProductId(null);
      onProductSelect(null);
      onPortionSelect("");
      onQuantitySelect(1);
      onGramsSelect(0);
    } else {
      setSelectedProductId(productId);
      onProductSelect(product);
      onPortionSelect(product.portion);
      onQuantitySelect(product.quantity);
      onGramsSelect(product.gram);
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
          {history.length > 0 && history[0].products.map((item, index) => (
            <TableRow
              key={`${item.fdcId}-${index}`}
              onClick={() => handleProductSelect(item, index)}
              selected={selectedProductId === `${item.fdcId}-${index}`}
              style={{
                backgroundColor: selectedProductId === `${item.fdcId}-${index}` ? '#686868' : 'inherit',
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
