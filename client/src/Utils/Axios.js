import axios from 'axios';

let url = '';

class Axios {
	constructor() {
		if(localStorage.getItem('jwtToken')){
		    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');  
		}
  	}

	login(username, password, callback){
		if(username && password){
	      axios.post(url + '/auth/login', {username : username, password: password})
	        .then(res => {
	            if(res.data && res.data.success){
	                 console.log(res);
	                axios.defaults.headers.common['Authorization'] = res.data.token;
	                localStorage.setItem('jwtToken', res.data.token);
	                localStorage.setItem('usertype', res.data.usertype);
	                localStorage.setItem('username', res.data.username);
	                callback(null, res.data);
	            }
	            else {
	            	callback("Unknown error", null);
	            }
	          })
	        .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback(error.response.data.msg, null);
	             	}
	             	else{
	             		callback(error.response.data.msg, null);
	             	}
	             }
	             else {
	             	callback("Unknown error", null);
	             }
	          });
	    }
	    else {
	      callback("Fill Up all details", null);
	    }
	}
    getProfile(callback){
        if(localStorage.getItem('jwtToken')){
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            axios.get(url + '/auth/profile')
                .then(res => {
                    callback(null, res.data.user);
                })
                .catch((error) => {
                    if(error.response){
                        if(error.response.status === 401){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback('unauthorized server', null);
                        }
                        else{
                            console.log(error);
                            callback("server error", null);
                        }
                    }
                    else {
                        console.log(error);
                        callback("server error", null);
                    }
                });
        }
        else {
            callback('unauthorized local', null);
        }
    }

    createproduct(productname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        if(productname){
            axios.post(url + '/product/create', {productname : productname})
                .then(res => {
                    if(res.data && res.data.success){
                        // console.log(res);
                        callback(null, res.data);
                    }
                    else {
                        callback("Unknown error", null);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if(error.response && error.response.data){
                        if(!error.response.data.authorized){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback(error.response.data.msg, null);
                        }
                        else{
                            callback(error.response.data.msg, null);
                        }
                    }
                    else {
                        callback("Unknown error", null);
                    }
                });
        }
        else {
            callback("Fill Up all details", null);
        }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    deleteproduct(productname, callback){
	    if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        console.log(productname+"inaxios");
        if(productname){
            axios.post(url + '/product/delete', {productname : productname})
                .then(res => {
                    if(res.data && res.data.success){
                        // console.log(res);
                        callback(null, res.data);
                    }
                    else {
                        callback("Unknown error", null);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if(error.response && error.response.data){
                        if(!error.response.data.authorized){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback(error.response.data.msg, null);
                        }
                        else{
                            callback(error.response.data.msg, null);
                        }
                    }
                    else {
                        callback("Unknown error", null);
                    }
                });
        }
        else {
            callback("Fill Up all details", null);
        }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    editproduct(productname,editname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        console.log(productname+"inaxios");
        if(productname){
            axios.post(url + '/product/edit', {productname : productname, editname:editname})
                .then(res => {
                    if(res.data && res.data.success){
                        // console.log(res);
                        callback(null, res.data);
                    }
                    else {
                        callback("Unknown error", null);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if(error.response && error.response.data){
                        if(!error.response.data.authorized){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback(error.response.data.msg, null);
                        }
                        else{
                            callback(error.response.data.msg, null);
                        }
                    }
                    else {
                        callback("Unknown error", null);
                    }
                });
        }
        else {
            callback("Fill Up all details", null);
        }
    }
        else {
            callback('unauthorized local', null);
        }
    }
    showproduct(callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            axios.post(url + '/product/show')
                .then(res => {
                    if(res.data && res.data.success){
                        console.log(res.data,"axios");
                        callback(null, res.data);
                    }
                    else {
                        callback("Unknown error", null);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if(error.response && error.response.data){
                        if(!error.response.data.authorized){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback(error.response.data.msg, null);
                        }
                        else{
                            callback(error.response.data.msg, null);
                        }
                    }
                    else {
                        callback("Unknown error", null);
                    }
                });
        }
        else {
            callback('unauthorized local', null);
        }
    }
    createproducttask(id,taskname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            if(id && taskname){
                axios.post(url + '/product/addtask', {id : id,taskname:taskname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    editproducttask(id,task_id,editname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            if(id && task_id){
                axios.post(url + '/product/edittask', {id : id,task_id:task_id, editname:editname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    deleteproducttask(id,taskname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            //console.log(productname+"inaxios");
            if(id && taskname){
                axios.post(url + '/product/deletetask', {id : id,taskname:taskname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    createproductsubtask(id,taskname,subtaskname,subtasktype,subtaskoption, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            if(id && taskname){
                axios.post(url + '/product/addsubtask', {id : id,taskname:taskname, subtaskname:subtaskname,subtasktype:subtasktype,subtaskoption:subtaskoption})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    deleteproductsubtask(id,taskname,subtaskname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            if(id && taskname){
                axios.post(url + '/product/deletesubtask', {id : id,taskname:taskname, subtaskname:subtaskname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    editproductsubtask(id,taskname,subtaskname,editname,edittype,editoption, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            //console.log(productname+"inaxios");
            if(subtaskname&&editname){
                axios.post(url + '/product/editsubtask', {id:id,taskname:taskname,subtaskname : subtaskname, editname:editname,edittype:edittype,editoption:editoption})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    createtask(taskname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            if(taskname){
                axios.post(url + '/task/create', {taskname : taskname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    deletetask(taskname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            //console.log(productname+"inaxios");
            if(taskname){
                axios.post(url + '/task/delete', {taskname : taskname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    edittask(taskname,editname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            //console.log(productname+"inaxios");
            if(taskname&&editname){
                axios.post(url + '/task/edit', {taskname : taskname, editname:editname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    showtask(callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            axios.post(url + '/task/show')
                .then(res => {
                    if(res.data && res.data.success){
                        console.log(res.data,"axios");
                        callback(null, res.data);
                    }
                    else {
                        callback("Unknown error", null);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if(error.response && error.response.data){
                        if(!error.response.data.authorized){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback(error.response.data.msg, null);
                        }
                        else{
                            callback(error.response.data.msg, null);
                        }
                    }
                    else {
                        callback("Unknown error", null);
                    }
                });
        }
        else {
            callback('unauthorized local', null);
        }
    }
    createsubtask(subtaskname,subtasktype,subtaskoption, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            if(subtaskname){
                axios.post(url + '/subtask/create', {subtaskname : subtaskname,subtasktype:subtasktype,subtaskoption:subtaskoption})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    deletesubtask(subtaskname, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            //console.log(productname+"inaxios");
            if(subtaskname){
                axios.post(url + '/subtask/delete', {subtaskname : subtaskname})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    editsubtask(subtaskname,editname,edittype,editoption, callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            //console.log(productname+"inaxios");
            if(subtaskname&&editname){
                axios.post(url + '/subtask/edit', {subtaskname : subtaskname, editname:editname,edittype:edittype,editoption:editoption})
                    .then(res => {
                        if(res.data && res.data.success){
                            // console.log(res);
                            callback(null, res.data);
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response && error.response.data){
                            if(!error.response.data.authorized){
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('name');
                                localStorage.removeItem('username');
                                callback(error.response.data.msg, null);
                            }
                            else{
                                callback(error.response.data.msg, null);
                            }
                        }
                        else {
                            callback("Unknown error", null);
                        }
                    });
            }
            else {
                callback("Fill Up all details", null);
            }
        }
        else {
            callback('unauthorized local', null);
        }
    }
    showsubtask(callback){
        if(localStorage.getItem('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

            axios.post(url + '/subtask/show')
                .then(res => {
                    if(res.data && res.data.success){
                        console.log(res.data,"axios");
                        callback(null, res.data);
                    }
                    else {
                        callback("Unknown error", null);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if(error.response && error.response.data){
                        if(!error.response.data.authorized){
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('name');
                            localStorage.removeItem('username');
                            callback(error.response.data.msg, null);
                        }
                        else{
                            callback(error.response.data.msg, null);
                        }
                    }
                    else {
                        callback("Unknown error", null);
                    }
                });
        }
        else {
            callback('unauthorized local', null);
        }
    }
	logout(callback){
		  localStorage.removeItem('jwtToken');
	      localStorage.removeItem('name');
	      localStorage.removeItem('username');
	      callback();
	}
}

let globalAxios = new Axios();

export default globalAxios;