import './CommiteSetings.scss';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchMessige, EditMessige, DeleteMessige } from '../../store/action/MessigeAction';
import { FolderViewOutlined, DeleteOutlined } from '@ant-design/icons';
import { RemoveItem } from '../removeItem';

export const CommiteSetings = () => {
  const { Messige } = useAppSelector(state => state.Messige);

  const dispatch = useAppDispatch();
  const [deletePage, setDeletePage] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(fetchMessige());
  }, [dispatch, deletePage]);

  function editMessige(id: number) {
    dispatch(EditMessige(id));
    dispatch(fetchMessige());
  }

  function deleteItem(id: number) {
    dispatch(DeleteMessige(id));
    dispatch(fetchMessige());
    setDeletePage(false);
  }

  return (
    <div className="CommiteSetings">
      {/* <div className="table">
        <div className="table-row table-header">
          <div className="table-cell">id</div>
          <div className="table-cell">Name</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Commit for user</div>
          <div className="table-cell">setting</div>
        </div>
        {Messige?.map((el, index) => (
          <div
            className={
              index % 2 ? (!el.seen ? 'sev seen' : 'sev') : !el.seen ? 'seen' : ''
            }
            key={el.id}
          >
            <div className="table-row">
              <div className="table-cell">
                {index + 1}
                {!el.seen && <p>new</p>}
              </div>
              <div className="table-cell">{el?.name}</div>
              <div className="table-cell">{el?.email}</div>
              <div className="table-cell">{el?.message}</div>
              <div className="table-cell del">
                <div onClick={() => editMessige(el.id)}>
                  <FolderViewOutlined />
                </div>
                <div onClick={() => { setDeletePage(true); setId(el.id); }}>
                  <DeleteOutlined />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="Employees" id="Employees">
          <div className="Employees_body">
            {Messige?.map((el: any, index:number) => (
              <div key={el?.id} className="Employees_row">
                <div className="Employees_cell">Id: {index+1}</div>
                <div className="Employees_cell">Name: {el?.name}</div>
                <div className="Employees_cell">Surname: {el?.email}</div>
                <div className="Employees_cell">Email: {el?.message}</div>
                <div className="Employees_cell"> 
                 <div onClick={() => editMessige(el.id)}>
                  <FolderViewOutlined />
                </div>
                <div onClick={() => { setDeletePage(true); setId(el.id); }}>
                  <DeleteOutlined />
                </div></div>
             
              </div>
            ))}
          </div>
          </div>
      {deletePage && <RemoveItem deleteItem={deleteItem} setDeletePage={setDeletePage} id={id} />}
    </div>
  );
};
