// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoTaskContract {
  event AddTask(address recipient, uint taskID);
  event RemoveTask(uint taskId, bool isDeleted);
  event CompleteTask(uint taskId, bool isCompleted, string completedAt);
//{id: 1, title: "Task 1", createdAt: "10/12/22", completedAt: "10/12/22", isChecked: false, isDeleted: false}
  struct Task {
    uint id;
    string title;
    string createdAt;
    string compeledAt;
    bool isChecked;
    bool isDeleted;
  }

  Task[] private tasks;
  mapping(uint256 => address) taskToOwner;

   function addTask(string memory title, string memory createdAt) public {
    uint id = tasks.length;
    tasks.push(Task(id, title, createdAt, "", false, false));
    taskToOwner[id] = msg.sender;
    emit AddTask(msg.sender, id);
   }

   function getMyTasks() public view returns (Task[] memory) {
    Task[] memory myTasks = new Task[](tasks.length);
    uint counter = 0;
    for (uint i = 0; i < tasks.length; i++) {
      if (taskToOwner[i] == msg.sender && !tasks[i].isDeleted) {
        myTasks[counter] = tasks[i];
        counter++;
      }
    }
     Task[] memory result = new Task[](counter);
    for (uint i = 0; i < counter; i++) {
      result[i] = myTasks[i];
    }
    return result;
   }

   function removeTask(uint taskId, bool isDeleted) public {
    if(taskToOwner[taskId] == msg.sender) {
      tasks[taskId].isDeleted = isDeleted;
      emit RemoveTask(taskId, isDeleted);
    }
   }

   function completeTask(uint taskId,bool isChecked, string memory completedAt) public {
    tasks[taskId].isChecked = isChecked;
    tasks[taskId].compeledAt = completedAt;
    emit CompleteTask(taskId, isChecked, completedAt);
   }

}
