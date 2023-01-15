// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract VotingSystem{

    struct Party{
        string partyName;
        address partyAddress;
        uint votingCount;    
    }

    mapping(uint256=>Party) public party;
    mapping(string=>bool)public partyRegistration;
    mapping(uint256=>string) public electionWinner;

    mapping(uint256=>bool) public doneVotingByVotters;
    uint256 public vottersCount;
    address public electionCommitioner;
    uint256 public partyCount;
    string public winnersName;
    uint256 public votingStartTime;
    uint256 public votingEndTime;

    error votingAlreadyEnded();
    error votingNotStartYet(uint256 votingStartTime);
    error votingTimeIsShorter();

    ElactionStateFactory Ef;
    constructor(address EF_adr){
        Ef=ElactionStateFactory(EF_adr); 
        electionCommitioner=Ef.callElectionCommitioner();
    }

    function timeScadule(uint256 _votingEndTime)public {
        if(block.timestamp+60>block.timestamp+_votingEndTime){
            revert votingTimeIsShorter();
        }
        require(electionCommitioner==msg.sender,"caller should  EC.");
        votingStartTime=block.timestamp;
        votingEndTime=votingStartTime+_votingEndTime;
    }

    function newParty(string memory _partyName)public {         
        require(!partyRegistration[_partyName],"party already been declared");
        require(electionCommitioner==msg.sender,"opretor should EC.");   
          
        Party storage p = party[partyCount++];
        p.partyName=_partyName;
        p.partyAddress=msg.sender;
        p.votingCount=0; 
        partyRegistration[_partyName]=true; 
    }
    
    State s;

    function voting(address _stateAdr,uint _voterId,uint256 paryIndexId) external{
       
        if(votingStartTime==0)   {
            revert votingNotStartYet(votingStartTime);            
        }

        if(block.timestamp>votingEndTime){
            revert votingAlreadyEnded();
        }  

        s=State(_stateAdr); 
        Party storage p=party[paryIndexId];   
        
        require(s.registeredVoter(_voterId),"You should have to register first.. ");
        require(s.votersAddressForVotingSystem(_voterId)==msg.sender,"Wrong Address..You Should Register First");        
        require(!doneVotingByVotters[_voterId],"you have been voted already!!!");
        require(electionCommitioner!=msg.sender,"Voter should Not EC.");

        p.votingCount=p.votingCount+1;
        doneVotingByVotters[_voterId]=true;
        vottersCount++;        

    }

    uint256 Highestvote;
    uint public ElectionYear;
    function winnerIs()public{
        require(electionCommitioner==msg.sender,"opretor should EC."); 
        uint256 gretest;
        for(uint i;i<=partyCount;i++){
            Party storage p=party[i];
            if(p.votingCount>gretest){
                gretest=p.votingCount;
            }
        }  
        Highestvote=gretest;
        for(uint i;i<=partyCount;i++){
            Party storage p=party[i];

            if(p.votingCount==gretest){                
                winnersName= p.partyName;
                ElectionYear=block.timestamp/60/60/24/365+1970;
                electionWinner[ElectionYear]=winnersName;
            }     
        }  

    }
}
// ------------------------------------------------------------------>

contract ElactionStateFactory   {

    address[] public deployedElactionStateFactory;

    struct DeployedStates{
        string deployedStateName;
        address deployedStateAddress;
        bool  state;
    }   

    DeployedStates[] public deployedstates;

    mapping(string=>bool) public deployedStateName;

    address public electionCommitioner=msg.sender;

    function callElectionCommitioner()public view returns(address){
        return electionCommitioner;
    }    

    function creatingNewState(string memory _stateName) external{
   
        require(!deployedStateName[_stateName],"State already been declared");
        require(electionCommitioner==msg.sender,"should Ec");

        address newState=address(new State(address(this),_stateName,msg.sender));
        deployedElactionStateFactory.push(newState);
        deployedstates.push(DeployedStates(_stateName,newState,true));
        deployedStateName[_stateName]=true;
    } 

    function getStates() public view returns (DeployedStates[] memory) {
        return deployedstates;
    }
}

// ------------------------------------------------------------------>

contract State{

    address public electionCommitioner;
    address public  stateAddress=address(this);
    string public stateName;   
    error picodeAlreadyAdded(bool pincode);

    ElactionStateFactory EC;
    constructor(address EF_adr,string memory _stateName,address _electionCommitioner){
 
    EC=ElactionStateFactory(EF_adr);    
    address  Ec_address;
    Ec_address=EC.callElectionCommitioner();
    
    require(Ec_address==_electionCommitioner,"Not Permited.Illigal Access..");
    
    stateName=_stateName;
    electionCommitioner=_electionCommitioner;
    }

    struct Voters{
        address voterAddressId;
        bool vaterRegistration;
        string Name;
        uint Age;
        string RecidentAddress;
        string City;
        uint pinCode;                     
    }

    mapping(uint256=>Voters) public  voters;
    mapping(address=>bool)public GenuneVoters;
    mapping(uint256=>bool) public pinCode;

    uint256 public votersCount;

    function addPincode(uint _pinCode)public {

        if(pinCode[_pinCode]){
             revert picodeAlreadyAdded(pinCode[_pinCode]);
        }    
        require(electionCommitioner==msg.sender,"electionCommitioner Only");
        pinCode[_pinCode]=true;    
    }

    function addVoter(        
        string memory _name,
        uint _age,
        string memory _recidentAddress
        ,string memory _city,
        uint _pinCode
    ) external  {
        require(!GenuneVoters[msg.sender],"voter register already!!");
        require(electionCommitioner!=msg.sender,"Ec not allowd to add voters.");
        require(pinCode[_pinCode],"pinCode Is Invalid.");

        Voters storage v=voters[votersCount++];
        v.voterAddressId=msg.sender;
        v.vaterRegistration=true;
        v.Name=_name;
        v.Age=_age;
        v.RecidentAddress=_recidentAddress;
        v.City=_city;
        v.pinCode=_pinCode; 
        GenuneVoters[msg.sender]=true;

       
    }

    function registeredVoter(uint _index)external view returns(bool){
        Voters storage v=voters[_index];
        return v.vaterRegistration;
    }

    function votersAddressForVotingSystem(uint256 _index)external view returns(address){
         Voters storage v=voters[_index];
        return v.voterAddressId;
    }

}