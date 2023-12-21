import './styles/editabletable.css'
import { db } from "./firebase_config";



const EditableTable = ({data}) => {
 
  const onChangeInput = (e, id) => {
    const {name, value} = e.target;
    db.collection("items")
      .doc(id)
      .update({
        [name]: value && !value.endsWith(".") ? parseFloat(value) : value,
      });
  };
  
  const onDelete = (id) => {
     db.collection("items").doc(id).delete();
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Date time</th>
            <th>High BP</th>
            <th>Low BP</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, highBP, lowBP, timestamp }) => (
            <tr key={id}>
              <td>
                <pan>{new Date(timestamp).toLocaleString()}</pan>
              </td>
              <td>
                <input
                  name="highBP"
                  value={highBP}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type High BP"
                />
              </td>
              <td>
                <input
                  name="lowBP"
                  value={lowBP}
                  type="text"
                  onChange={(e) => onChangeInput(e, id)}
                  placeholder="Type Low BP"
                />
              </td>
              
              <td>
                <button style={{marginLeft: 20}} onClick={e => onDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditableTable