import './RemoveItem.scss'

export const RemoveItem = ({ deleteItem,name, setDeletePage, id }: any) => {
  return (
    <div className='RemoveDiv'  onClick={()=>setDeletePage(-1)}>
      <div className='RemoveItem'>
        <h2>Delete { name} ?</h2>
        <div>
          <button className='Yes' onClick={() => { deleteItem(id) }}>Yes</button>
          <button onClick={() => setDeletePage(-1)}>No</button>
        </div>
      </div>
    </div>
  )
}
