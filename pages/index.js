import Head from "next/head";
import Image from "next/image";
import moment from "moment";
import React, { useState, useEffect } from "react";
import ToDoList from "../components/todo/todo-list";
import styles from "../styles/Home.module.css";
import ConnectWalletButton from "../components/ConnectWalletButton";
import WrongNetworkMessage from "../components/WrongNetworkMessage";
import { TodoTaskContractAddress } from "../config";
import TodoTaskAbi from "../backend/build/contracts/TodoTaskContract.json";
import { ethers } from "ethers";

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllTasks();
  }, []);
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to " + chainId);
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        console.log("Please connect to Rinkeby Test Network");
        setCorrectNetwork(false);
        return;
      } else {
        setCorrectNetwork(true);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found accounts: ", accounts);
      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    e.preventDefault(); // Prevents page from refreshing
    let task = {
      title: input,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoTaskContract = new ethers.Contract(
          TodoTaskContractAddress,
          TodoTaskAbi.abi,
          signer
        );
        todoTaskContract.addTask(task.title, task.createdAt).then((res) => {
          setTasks([...tasks, task]);
          alert("Task added successfully");
        });
        /* let task = e.target.task.value;
        let taskCount = await todoTaskContract.taskCount();
        let createTask = await todoTaskContract.createTask(task);
        await createTask.wait();
        alert("Task created successfully");
        e.target.reset();*/
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoTaskContract = new ethers.Contract(
          TodoTaskContractAddress,
          TodoTaskAbi.abi,
          signer
        );
        let allTasks = await todoTaskContract.getMyTasks();
        setTasks(allTasks);
        console.log(allTasks);
      } else {
        alert("Etherum Object not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const removeTask = (key) => async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoTaskContract = new ethers.Contract(
          TodoTaskContractAddress,
          TodoTaskAbi.abi,
          signer
        );
        const removeTaskTx = await todoTaskContract.removeTask(key, true);
        console.log("Task removed successfully", removeTaskTx);
        let allTasks = await todoTaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("Etherum Object not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Complete tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const completeTask = (key, checkKey) => async () => {
    console.log(checkKey);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoTaskContract = new ethers.Contract(
          TodoTaskContractAddress,
          TodoTaskAbi.abi,
          signer
        );
        if (checkKey == true) {
          await todoTaskContract.completeTask(key, false, "");
        } else {
          await todoTaskContract.completeTask(
            key,
            true,
            moment().format("MMMM Do YYYY, h:mm:ss a")
          );
        }

        console.log("Task Completed successfully");
        let allTasks = await todoTaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("Etherum Object not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isUserLoggedIn ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork ? (
        <ToDoList
          tasks={tasks}
          input={input}
          setInput={setInput}
          addTask={addTask}
          removeTask={removeTask}
          completeTask={completeTask}
        />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
