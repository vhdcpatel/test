const trasfromData = ( data )=> {
  const newData = data.map((listItem)=>({
    ...listItem,
    "Points":0
  }))
  return newData;
}

export default trasfromData;