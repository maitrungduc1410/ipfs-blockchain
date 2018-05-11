# IPFS-Blockchain built with VueJS and Laravel

This project demo how to intergrate blockchain with IPFS to store and track file history. This app build with Laravel, VueJS, IPFS and Ethereum blockchain

## Introduction
Saving data on blockchain is very expensive. You should see this [article](https://medium.com/ipdb-blog/forever-isnt-free-the-cost-of-storage-on-a-blockchain-database-59003f63e01).

With [IPFS](https://ipfs.io/) we can "save" a lot of data into blockchain by saving the hash of data which saved in IPFS system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Geth
Go-ipfs
```

### Installing

A step by step series of examples that tell you have to get a development env running

First you need to install <b>Geth</b>. Follow this instruction [GETH](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)
You should set up, init your genesis block, then when you run your command to start Geth, you should add these options at the end of the command.
```
--rpc --rpccorsdomain "*" --rpcapi “web3,eth,personal” 
```

Then you should install <b>go-ipfs</b>. Then run ipfs in daemon with this command:

```
ipfs daemon
```
Then to start your app you run the following commands:

```
php artisan serve
```

```
npm run dev or npm run watch (it's up to you)
```
Then open your browser and go to route <pre>http://localhost:8000/</pre>

And then to try to test your app.
Try to add new file or rename...(do whatever you want). Right after that, look at the terminal tab you're running <b>Geth</b>, you'll see a new transaction appended. then you should run this command to confirm the transaction:

```
geth attach
```

Then when you access geth console, start mining, by run this:
```
miner.start(1) //the number '1' is the number of cpu core you want to spend on mining
```
After block has the transaction has mined. You can go back your browser and re-check your file. 
Now your file's profile has been saved into the transaction permantly. You can right click on the file and view its detail info in the transaction.

This app has other features, you can play around with them.

## Built With

* [IPFS](https://ipfs.io/) - A peer-to-peer hypermedia protocol
* [Geth](https://geth.ethereum.org/) - Go Ethereum
* [Laravel](https://laravel.com/) - The PHP framework used
* [VueJS](https://vuejs.org/) - The Progressive JavaScript Framework
* [Buefy](https://buefy.github.io/) - Lightweight UI components for Vue.js
