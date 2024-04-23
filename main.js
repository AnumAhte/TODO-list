import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select an option",
            choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
        }
    ]);
    if (ans.select === "ADD") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add your item",
            validate: function (input) {
                if (input.trim() == "") {
                    return "Enter non-empty item";
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    else if (ans.select === "UPDATE") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "update items in the list",
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add your item",
        });
        let newTodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    else if (ans.select === "VIEW") {
        console.log("********TO-DO LIST********");
        console.log(todos);
    }
    else if (ans.select === "DELETE") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "select item to delete",
            choices: todos.map(item => item)
        });
        let newTodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newTodo];
        console.log(todos);
    }
    else if (ans.select === "EXIT") {
        console.log("exiting programme..");
        condition = false;
    }
}
