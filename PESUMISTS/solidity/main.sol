pragma solidity ^0.8.0;
// SPDX-License-Identifier: GPL-3.0

contract ArtPlatform {
    //Showcase
    
    address admin;
    uint user_count;
    
    struct User {
        uint id;
        string name;
        address payable wallet;
        // mapping (address => Project) i_own;
        uint rating;
    }
    //G & S
    function getUserId(address _address) public view returns (uint) {
        return users[_address].id;
    }

    // function setUserId(address _address, uint _id) public {
    //     users[_address].id = _id;
    // }

    function getUserName(address _address) public view returns (string memory) {
        return users[_address].name;
    }

    function setUserName(address _address, string memory _name) public {
        users[_address].name = _name;
    }

    function getUserWallet(address _address) public view returns (address payable) {
        return users[_address].wallet;
    }

    // function setUserWallet(address _address, address payable _wallet) public {
    //     users[_address].wallet = _wallet;
    // }

    function getUserRating(address _address) public view returns (uint) {
        return users[_address].rating;
    }

    function setUserRating(address _address, bool k) public {
        if (k==true){users[_address].rating = users[_address].rating+1;
        return;}
        users[_address].rating = users[_address].rating-1;

        
    }






    mapping (uint => Order) public orders;
    mapping(address => uint[]) public userOrders;
    mapping (address => User) public users;
    mapping (uint => Project) public projects;
    mapping(address => uint[]) public userProjects;

    function getOrder(uint orderId) public view returns (Order memory) {
        return orders[orderId];
    }

    function getUserOrders(address userAddress) public view returns (uint[] memory) {
        return userOrders[userAddress];
    }

    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }

    function getProject(uint projectId) public view returns (Project memory) {
        return projects[projectId];
    }

    function getUserProjects(address userAddress) public view returns (uint[] memory) {
        return userProjects[userAddress];
    }




    struct Project {
        uint id;
        string name;
        string description;
        address payable artist;
        address payable owner;
        uint price;
        uint256 publishtime;
    }
    
    uint public projectCount;
    uint public OrderCount;
    function isRegistered(uint _id) public view returns (bool){
        if(_id<user_count){
            return true;
        }
        return false;


    }
    
    
    event ProjectCreated(uint id, string name, string description, address payable artist, uint price,uint256 timestamp);
    event ProjectPurchased(uint id, string name, address payable buyer, uint price);
    
    constructor() {
        admin = msg.sender;
        projectCount = 0;
        user_count=0;
        OrderCount=0;
    }
    
    function register(string memory _name) payable public {
        require(users[msg.sender].wallet == address(0), "User already registered.");
        uint _id = user_count++;
        users[msg.sender] = User(_id, _name, payable(msg.sender),50);
    }
    
    function createProject(string memory _name, string memory _description, uint _price) public {
        require(users[msg.sender].wallet != address(0), "User not registered.");
        projectCount++;
        projects[projectCount] = Project(projectCount, _name, _description, payable(msg.sender),payable(msg.sender), _price,block.timestamp);//making owner as artist
        emit ProjectCreated(projectCount, _name, _description, payable(msg.sender), _price,block.timestamp);
        userProjects[msg.sender].push(projectCount);
    }
    
    function purchaseProject(uint _id) public payable {
        Project memory _project = projects[_id];
        require(_project.id > 0 && _project.id <= projectCount, "Invalid project id.");
        // require(!_project.isSold, "Project already sold.");
        require(msg.sender != _project.owner, "Can't purchase own project.");
        require(address(msg.sender).balance > _project.price, "Incorrect amount in vallet.");
        require(msg.value == _project.price, "Incorrect amount is being sent.");
        // msg.value      =_project.price;
        // _project.isSold = true;
        projects[_id] = _project;
        userProjects[msg.sender].push(_id);

        uint256[] storage values = userProjects[_project.owner];

        for (uint256 i = 1; i < values.length; i++) {
            if (values[i] == _id) {
                // Shift all elements after the one we want to remove
                for (uint256 j = i; j < values.length - 1; j++) {
                    userProjects[_project.owner][j] = userProjects[_project.owner][j+1];
                }
                // userProjects[_project.owner].splice();
                // Remove the last element of the array
                userProjects[_project.owner].pop();
                break;
            }
        }
    
        // userProjects[ _project.owner].delete(_id);
        
        
        // users[_project.artist].wallet.transfer(_project.price);
        // emit ProjectPurchased(_id, _project.name, payable(msg.sender), _project.price);
        _project.owner.transfer(msg.value);
        projects[_id].owner= payable(msg.sender);
        emit ProjectPurchased(_id, _project.name, payable(msg.sender), _project.price);

    }
    
    function returnProj(uint _id) public view returns(Project memory project1 ) {
        project1 = projects[_id];
    }


    //On Demand
     struct Order{
        uint id;
        address payable Client;     // The address of the client who created the project
        string title;               // The title of the project
        string description;         // The description of the project
        uint256 budget;             // The budget for the project
        uint256 deadline;           // The deadline for the project (UNIX timestamp)
        // bool isSubmitted;
        // bool approvedC;             // Whether the project is completed or not
        // bool approvedB;
        // mapping(address => bool) hasSubmitted;  // Mapping of creative professionals who have submitted work for the project
        uint256 submissionTime;  // Mapping of the submission time for each creative professional
        // mapping(address => uint256) submissionIndex;  // Mapping of the submission index for each creative professional
        // mapping(uint256 => address) submissions;      // Mapping of the creative professional address for each submission
        uint256 submissionCount;    // The number of submissions for the project
        address payable selectedProfessional;  // The address of the professional selected by the client to complete the project
        // bool paid;
        bool[4] flags;//[ isSubmitted,   approvedC;  approvedB;  paid;]           // Whether the client has paid the professional or not
    }
    

    event OrderPlaced(uint id, string name, string description, address payable buyer,address payable artist, uint budget);
    // event OrderClosed(uint id, string name, address payable buyer, uint price);

    function createOrder(string memory _title,address payable Professional, uint256 deadline,uint256 budget,string memory _description) public {
        require(users[msg.sender].wallet != address(0), "User not registered.");
        require(address(msg.sender).balance >= budget, "Incorrect amount in vallet.");
        OrderCount++;
        orders[OrderCount] = Order(OrderCount,payable(msg.sender), _title, _description,budget,deadline, 0,0, Professional,[false,false,false,false]);
        emit OrderPlaced(OrderCount, _title, _description, payable(msg.sender),Professional, budget);
        userOrders[msg.sender].push(OrderCount);
    }
    event SentForApproval(uint _id);
    event GotApproval(uint _id);
    event ApprovedAndCompleted(uint _id);
    function SubmitOrder(uint _id) public { //Artist submissions
        require(users[msg.sender].wallet != address(0), "User not registered.");
        orders[_id].flags[0]=true;
        emit SentForApproval(_id);

    }
    function ApproveOrder(uint _id) payable public { //Artist submissions
        require(users[msg.sender].wallet != address(0), "User not registered.");
        require(orders[_id].flags[0] == true, "Artist has not submitted yet");
        orders[_id].flags[2]=true;
        require(address(orders[_id].Client).balance >= orders[_id].budget, "Incorrect amount in Client vallet.");
        require(msg.value== orders[_id].budget, "Wrong amount specified");
        orders[_id].selectedProfessional.transfer(msg.value);
        emit GotApproval(_id);

    }
    function ApproveOrderByArtist(uint _id)  public { //Artist submissions
        require(users[msg.sender].wallet != address(0), "User not registered.");
        orders[_id].flags[1]=true;
        // require(msg.value== orders[_id].budget, "Wrong amount specified");
        orders[_id].flags[3]=true;
        
        emit ApprovedAndCompleted(_id);


    }

    event copyrightProtected();
    function copyrightClaim(uint Claimer_ProjectID,uint Disputee_ProjectID) public {
        require(users[msg.sender].wallet != address(0), "User not registered.");
        require( Claimer_ProjectID!=Disputee_ProjectID, "Your project does not exist");
        require( Claimer_ProjectID<=projectCount && Claimer_ProjectID>0, "Your project does not exist");
        require( Disputee_ProjectID<=projectCount && Disputee_ProjectID>0, "Infrinnger's project does not exist");
        require( projects[ Claimer_ProjectID].owner==msg.sender, "This is not your project");
        //projects[Claimer_ProjectID].publishtime<projects[Disputee_ProjectID].publishtime
        if (Claimer_ProjectID<Disputee_ProjectID){
            // Project memory _project = projects[ Disputee_ProjectID];
            
            // uint256[] storage values = userProjects[_project.owner];
            projects[ Disputee_ProjectID].owner=payable(admin);
            //  userProjects[_project.owner]{'','',0};

            // for (uint256 i = 1; i <= values.length; i++) {
            //     if (values[i] == Disputee_ProjectID) {
            //     // Shift all elements after the one we want to remove
            //         // for (uint256 j = i; j < values.length - 1; j++) {
            //         // values[j] = values[j+1];
            //         // }
            //     values[i]=0;
            //     // Remove the last element of the array
                    // values.pop();
                    emit copyrightProtected();
                   
                }
            }
        
        
        }