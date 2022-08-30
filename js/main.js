var web3;
        var contract;
        async function start(){

        if(window.ethereum){

            try {
                const accounts = await ethereum.request({method:'eth_requestAccounts'});
                account = accounts[0];
                document.querySelector('p').innerHTML = 'seja bem-vindo: ' + account;
                Swal.fire('Conectado na conta ' + account);
                web3 = new Web3(window.ethereum);
                
            } catch (e) {}
        }

            contract = new web3.eth.Contract([
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pegarRecompensa",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "aposta",
				"type": "string"
			}
		],
		"name": "setarAposta",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkAposta",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkResultado",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0x8Fb8C9fe5183814bC6EB4a3eC38FbD96346244AF");
            chamarBlockchain(contract);
            criarAposta(contract, account);
            pegarRecompensa(contract, account);
    }

    async function chamarBlockchain(contract){
            let resultado = await contract.methods.checkAposta().call();
           document.querySelector('h2').innerHTML = "resultado da aposta " + resultado;
        }

    async function criarAposta(contract, account){
        let btn = document.querySelector('button#enviar');
        btn.addEventListener('click', ()=>{
            Swal.fire('Enviando...');
            let aposta = document.querySelector('input').value;
            contract.methods.setarAposta(aposta).send({from:account})
            .once('confirmation', function(cofNumber, receipt){
                Swal.fire('Sua Aposta foi envianda aguarde...');
            })
        });
    }


    async function pegarRecompensa(contract, account){
        let btn = document.querySelector('button#pegar');
        btn.addEventListener('click', ()=>{
            Swal.fire('Verificando Aposta....');
            let aposta = document.querySelector('input').value;
            contract.methods.pegarRecompensa().send({from:account})
            .once('confirmation', function(cofNumber, receipt){
                Swal.fire('se voce apostou no corinthians, voce ganhou... se não perdeu...');
            })
        });
    }

        start();

      

        