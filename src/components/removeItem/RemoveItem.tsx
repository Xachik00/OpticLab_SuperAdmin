import './RemoveItem.scss'

export const RemoveItem = ({deleteItem,setDeletePage,id}:any)  => {
  return (
    <div className='RemoveItem'>
        <h2>Delete ?</h2>
        <div>
            <button className='Yes' onClick={()=>{deleteItem(id)}}>Yes</button>
            <button onClick={()=>setDeletePage(false)}>No</button>
        </div>
    </div>
  )
}
