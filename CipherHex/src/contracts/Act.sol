pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract ACTPOINTSMGMT {
    struct Student {
        string name;
        string email;
        string IDNo;
        address payable ethAccount;
        uint16 points;
        bool diploma;
    }
    
    struct EvenT {
      address payable from;
      address payable to;
      uint16 points;
      string reason;
    }

    EvenT [] Stuff;
    uint256 stuffCount;
    event Transactions(EvenT);

    function doEvent(Student memory stu, uint16 _points, string memory _reason) public {
      Stuff[stuffCount] = EvenT(payable(msg.sender), payable(stu.ethAccount), _points, _reason);
    }

    mapping (bytes32 => Student) studentPoints;

    bytes32 [] emails;
    uint64 numEmails;

    address [] admins;
    uint32 numAdmins;

    modifier requireAdmin {
        bool yes = false;
        for (uint32 i = 0; i < numAdmins; i++) {
            if (admins[i] == msg.sender) {
                yes = true;
                break;
            }
        }
        require(yes, "Your account is not on the admin list. Cannot update activity point values\n");
        _;
    }

    constructor () public payable{
        studentPoints[keccak256(bytes("ashwinajoyd.ai22@rvce.edu.in"))] = Student("Ashwin", "ashwinajoyd.ai22@rvce.edu.in", "1RV22AI011", payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4) ,42, false);
        admins.push(msg.sender);
        admins.push(address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4));
        admins.push(address(0xa2caD533b2913218264C550BB3de114a02a82c68)); // Ganache thing
        admins.push(address(0x50cc436767d3667F43229dD63649FEe400C383c7)); // Ganache thing 2
        admins.push(address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2));
        numAdmins = 5;
    }

    function addStudent (
        string memory _name, 
        string memory _email,
        string memory _IDNo,
        uint16 _points,
        bool _diploma) 
        public returns (bool) {
            for (uint64 i = 0; i < numEmails; i++) {
                if (emails[i] == keccak256(bytes(_email))) return false;
            }
            studentPoints[keccak256(bytes(_email))] = Student(_name, _email, _IDNo, payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4), _points, _diploma);
            emails.push(keccak256(bytes(_email)));
            return true;
    }

    function getStudentInfo (string memory _email) public view returns (Student memory) {
        Student storage stu = studentPoints[keccak256(bytes(_email))];
        return (stu);
    }

    function setStudentInfo(string memory _email, uint16 _newPoints, string memory _reason) public payable returns (bool) {
        Student storage stu = studentPoints[keccak256(bytes(_email))];
        stu.points = _newPoints;
        doEvent(stu, _newPoints, _reason);
        return true;
    }

    function updateStudentInfo(string memory _email, uint16 addPoints, string memory _reason) public payable {
        Student storage stu = studentPoints[keccak256(bytes(_email))];
        doEvent(stu, addPoints, _reason);
        stu.points += addPoints;
    }

   function addAdmin (address newAdmin) public requireAdmin {
        admins[numAdmins] = newAdmin;
        numAdmins++;
   }

   function registerForEvent (address payable _to) public {
      (bool _success, ) = _to.call{value: 123}("");
      require(_success);
   }

   function test () public view  returns (address) {
        return msg.sender;
   }
}