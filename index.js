abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

provider = new ethers.providers.Web3Provider(window.ethereum);
signer = provider.getSigner(0);
contract = new ethers.Contract('0x7927e0148d6006CeC591Bc4C1659F81c36B04075', abi, signer)

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}


function voteForCandidate(candidate) {
    candidateName = document.querySelector("#candidate").value;
     console.log(candidateName);
   
     contract.voteForCandidate(ethers.utils.formatBytes32String(candidateName)).then((f) => {
       let div_id = candidates[candidateName];
       contract.totalVotesFor(ethers.utils.formatBytes32String(candidateName)).then((f) => {
         document.querySelector("#" + div_id).innerHTML = f;
       })
     });
}


// function voteForCandidate(candidate) {
//     candidateName = document.getElementById("candidate").value;
//     console.log(candidateName);
//     contract.voteForCandidate(ethers.utils.formatBytes32String(candidateName)).then((f) => {
//         let div_id = candidates[candidateName];
//         contract.totalVotesFor(ethers.utils.formatBytes32String(candidateName)).then((f) => {
//             document.querySelector("#" + div_id).innerHTML = f;
//         })
//     });
// }





document.addEventListener('DOMContentLoaded', function(event) {
    candidateNames = Object.keys(candidates);
    for (let i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        contract.totalVotesFor(ethers.utils.formatBytes32String(name)).then((f) => {
            document.querySelector("#" + candidates[name]).innerHTML = f;
        })
    }
});