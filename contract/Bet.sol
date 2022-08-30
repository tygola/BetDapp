// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract ApostaYoutube{

    bool apostaDisponivel = true;
    string private resultadoAposta = "corinthians";
    string pessoaApostaValor = "";

    address payable pessoaAposta;
    uint256 valueAposta;

    function deposit() public payable{}

    function setarAposta(string memory aposta) public payable{
        pessoaApostaValor = aposta;
        valueAposta = msg.value;
        pessoaAposta = payable(msg.sender);
    }

    function checkAposta() external view returns (string memory){
        if(apostaDisponivel){
            return resultadoAposta;
        } else{
            return "";
        }
    }

    function pegarRecompensa() public{
         if(keccak256(abi.encodePacked((resultadoAposta))) == keccak256(abi.encodePacked((pessoaApostaValor)))){
            //Ganhou
            bool sent = pessoaAposta.send(address(this).balance);
            require(sent, "Failed to send Ether");
        } else{

        }
    }

    function checkResultado() external view returns (bool){
        if(keccak256(abi.encodePacked((resultadoAposta))) == keccak256(abi.encodePacked((pessoaApostaValor)))){
            return true;
        } else{
            return false;
        }
    }

}