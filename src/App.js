import React from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user : {
        fname : "",
        lname : "",
        age : ""
      },
      users : [],
      pos : -1
    }
  }

  handleChange =(e) => {
    const {name , value} = e.target;
    let user = {...this.state.user};
    user[name] = value;

    this.setState({
      user
    });

    // 2nd method for handle change
    // this.setState({
    //   ...this.state,
    //   user : {
    //     ...this.state.user,
    //     [e.target.name] : e.target.value 
    //   }
    // });
  }


  clearForm = () => {
    this.setState({
      user : {
        fname : "",
        lname : "",
        age : ""
      }
    });
  }

  handleSave = (index,remove) => {
    let users = [...this.state.users];
    this.clearForm();
    if(remove)
      users.splice(index,1);
    else if(index===-1)
      users.push(this.state.user);
    else if(index>-1)
      users[index]=this.state.user;

    console.log("users",users);
    this.setState({
      users,
      pos : -1,
    });
  }

  handleQuickEdit = (index) => {
    let users = [...this.state.users];
    this.setState({
      user : users[index],
      pos : index
    });
  }

  render() {
    return (
      <div>
      
        <h1 className='heading'>FORM SUBMISSION</h1>
        <form className='forms'>
          <table>
            <tr>
              <td><label>First Name :</label></td>
              <td><input type='text' name='fname' value={this.state.user.fname} onChange={(e) => {this.handleChange(e)}}></input></td>
            </tr>
            <tr>
              <td><label>Last Name :</label></td>
              <td><input type='text' name='lname' value={this.state.user.lname} onChange={(e) => {this.handleChange(e)}}></input></td>
            </tr>
            <tr>
              <td><label>Age :</label></td>
              <td><input type='number' name='age' value={this.state.user.age} onChange={(e) => {this.handleChange(e)}}></input></td>
            </tr>
          </table>
          <br />
          <input className='btn' type='button' value='Submit' onClick = {() => {this.handleSave(this.state.pos)}}></input> 
         </form> 
         <br />
         <table border= '1px solid black'>
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.length ?
              this.state.users.map((ele,index)=>{
                return (
                  <tr key={index}>
                    <td>{ele.fname}</td>
                    <td>{ele.lname}</td>
                    <td>{ele.age}</td>
                    <td>
                      <div>
                        <button onClick={() => {this.handleQuickEdit(index)}}><EditIcon /></button>
                        <button onClick={() => {this.handleSave(index,true)}}><DeleteIcon /></button>
                      </div>
                    </td>
                  </tr>
                )
              })
              :
              <tr>No data exist</tr>
            }
          </tbody>
         </table>                         
      </div>
    )
  }
}

export default App;
