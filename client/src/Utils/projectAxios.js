import axios from "axios";
import showErr from "./errorAxios";

let url = "";

export function insertProject(data, callback) {
  if (localStorage.getItem("jwtToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    console.log(data);
    if (data) {
      axios
        .post(url + "/project/insert", { data: data })
        .then(res => {
          if (res.data && res.data.success) {
            // console.log(res);
            callback(null, res.data.project);
          } else {
            callback(res.data.err, null);
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
            if (!error.response.data.authorized) {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("name");
              localStorage.removeItem("username");
              callback(error.response.data.msg, null);
            } else {
              callback(error.response.data.msg, null);
            }
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  } else {
    callback("unauthorized local", null);
  }
}
export function getProjects(project_status, callback) {
  if (localStorage.getItem("jwtToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (project_status) {
      axios
        .get(url + "/project/getprojects/" + project_status)
        .then(res => {
          if (res.data && res.data.success) {
            console.log(res);
            callback(null, res.data);
          } else {
            callback(res.data.err, null);
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
            if (!error.response.data.authorized) {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("name");
              localStorage.removeItem("username");
              callback(error.response.data.msg, null);
            } else {
              callback(error.response.data.msg, null);
            }
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  } else {
    callback("unauthorized local", null);
  }
}
