import React from 'react';
import { Link } from "react-router-dom";

function LinkCard({ data }) {
  return (
    <div style={styles.card}>
      <br/><Link to= {`/country/${data.name.common}`}>{data.name.common}</Link>     
    </div>
  );
}

const styles = {
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    padding: '20px',
    margin: '20px',
    borderRadius: '5px',
    // 可以添加更多的样式
  }
};

export default LinkCard;