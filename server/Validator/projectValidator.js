const checker = require("./is-empty");

module.exports.projectInput = data => {
    let taskError = [];
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.project_id)) {
        errors.project_id = "Project Id field is required";
    }
    if (!checker.isStringAndNotEmpty(data.client_name)) {
        errors.client_name = "Client name field is required";
    }
    if (!checker.isNumber(data.quantity)) {
        errors.quantity =
            "Quantity field is required and it is Number type data";
    }
    if (!checker.isDate(data.deadline)) {
        errors.deadline = "Deadline field is required";
    }

    data.task.map((taski, i) => {
        let t = {
            task_name: taski.task_name,
            subtask: []
        };
        taski.subtask.map((subtaskj, j) => {
            let s = {
                subtask_name: subtaskj.subtask_name,
                subtask_err: ""
            };
            if (subtaskj.subtask_value) {
                if (
                    subtaskj.subtask_type === "Number" &&
                    !checker.isNumber(subtaskj.subtask_value)
                ) {
                    s.subtask_err =
                        subtaskj.subtask_name + " is a Number Field";
                }
                if (
                    subtaskj.subtask_type === "Date" &&
                    !checker.isDate(subtaskj.subtask_value)
                ) {
                    s.subtask_err = subtaskj.subtask_name + " is a Date Field";
                }
            }
            t.subtask.push(s);
        });
        console.log(t, taski, "sss");
        taskError.push(t);
    });
    console.log(taskError, "valid");
    errors.taskError = taskError;
    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
