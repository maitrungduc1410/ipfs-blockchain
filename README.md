# IPFS-Blockchain built with VueJS and Laravel

This project demo how to intergrate blockchain with IPFS to store and track file history. This app build with Laravel, VueJS, IPFS and Ethereum blockchain

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
Try to add new file or rename...(do whatever you want). Right after that, look at the terminal tab you're running <b>Geth>, you'll see a new transaction appended. then you should run this command to confirm the transaction:

```
geth attach
```

Then when you access geth console, start mining, by run this:
```
miner.start(1) //the number 1 is the cpu core you want to spend on mining
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
