import { useState, useEffect } from "react";
// Import and apply CSS stylesheet
import "./styles/app.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import Chart from "./Chart";
import EditableTable from "./EditableTable";

function App() {
  const [items, setItems] = useState([]);
  const [highBP, setHighBP] = useState("");
  const [lowBP, setLowBP] = useState("");
  
  useEffect(() => {
    getItems();
  }, []); // blank to run only on first launch

  function getItems() {
    db.collection("items").onSnapshot(function (querySnapshot) {
      setItems(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          highBP: doc.data().highBP,
          lowBP: doc.data().lowBP,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  }

  function addItem(e) {
    e.preventDefault();

    db.collection("items").add({
      timestamp: Date.now(),
      highBP: parseFloat(highBP),
      lowBP: parseFloat(lowBP),
    });

    setHighBP("");
    setLowBP("");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>BP Tracking 😃</h1>
        
        {items.length > 0 && <Chart data={items}/>}
        
        <form style={{display: 'flex', flexDirection: 'row', width: '40vw'}}>
          <TextField
            id="highBP"
            label="highBP"
            value={highBP}
            style={{ width: "50vw"}}
            onChange={(e) => setHighBP(e.target.value)}
          />
          <TextField
            id="lowBP"
            label="lowBP"
            value={lowBP}
            style={{ width: "50vw" }}
            onChange={(e) => setLowBP(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addItem}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>
       
        {items.length > 0 && <EditableTable data={items.sort((left, right) => right.timestamp - left.timestamp)}/>}
      </div>
    </div>
  );
}

export default App;
