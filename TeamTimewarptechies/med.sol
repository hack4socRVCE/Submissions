//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract med {
    uint public recordID;

    constructor(){
        recordID=0;
    }
    
    mapping(uint => Record) records;
    mapping(uint => VitalSigns) vitalSigns;
    mapping(uint => bool) public isDeleted;

    struct VitalSigns {
        uint systolicpressure;
        uint diastolicpressure;
        uint temp;
        uint oxygen;
        uint pulserate;
    }

    struct Record {
        uint recordID;
        uint timestamp;
        string name;
        uint weight;
        string diagonsis;
        string symptoms;
        string medicine;
        string remarks;
        VitalSigns vitalSigns;
    }

    event MedicalRecord_AddRecord(
    uint recordID,
    uint256 timestamp,
    string name,
    uint weight,
    uint[5] vitalSigns,
    string diagonsis,
    string symptoms,
    string medicine,
    string remarks
);

event MedicalRecord_DeleteRecord(
    uint recordID,
    uint256 timestamp,
    string name,
    uint weight,
    uint[5] vitalSigns,
    string diagonsis,
    string symptoms,
    string medicine,
    string remarks
);

function addRecord(
    string memory _name,
    uint _weight,
    uint _systolicpressure,
    uint _diastolicpressure,
    uint _temp,
    uint _oxygen,
    uint _pulserate,
    string memory _diagonsis,
    string memory _symptoms,
    string memory _medicine,
    string memory _remarks
) public {
    recordID++;
    VitalSigns memory vitals = VitalSigns({
        systolicpressure: _systolicpressure,
        diastolicpressure: _diastolicpressure,
        temp: _temp,
        oxygen: _oxygen,
        pulserate: _pulserate
    });
    records[recordID] = Record(recordID, block.timestamp, _name, _weight, _diagonsis, _symptoms,_medicine, _remarks, vitals);

    uint[5] memory vitalSignsArray = [_systolicpressure, _diastolicpressure, _temp, _oxygen, _pulserate];

    emit MedicalRecord_AddRecord(recordID, block.timestamp, _name,_weight, vitalSignsArray, _diagonsis, _symptoms, _medicine, _remarks);
}

function deleteRecord(uint256 _recordID) public {
    require(!isDeleted[_recordID], "Already Deleted Record");
    Record storage record = records[_recordID];
    isDeleted[_recordID] = true;

    uint[5] memory vitalSignsArray = [
        record.vitalSigns.systolicpressure,
        record.vitalSigns.diastolicpressure,
        record.vitalSigns.temp,
        record.vitalSigns.oxygen,
        record.vitalSigns.pulserate
    ];

    emit MedicalRecord_DeleteRecord(
        record.recordID,
        block.timestamp,
        record.name,
        record.weight,
        vitalSignsArray,
        record.diagonsis,
        record.symptoms,
        record.medicine,
        record.remarks
    );
}

    function getRecordId() public view returns(uint) {
        return recordID;
    }

    function getTimestamp(uint _recordId) public view returns(uint) {
        return records[_recordId].timestamp;
    }

    function getName(uint _recordId) public view returns(string memory) {
        return records[_recordId].name;
    }

    function getWeight(uint _recordId) public view returns(uint) {
        return records[_recordId].weight;
    }

    function getSystolicpressure(uint _recordId) public view returns(uint) {
        return records[_recordId].vitalSigns.systolicpressure;
    }

    function getDiastolicpressure(uint _recordId) public view returns(uint) {
        return records[_recordId].vitalSigns.diastolicpressure;
    }

    function getTemp(uint _recordId) public view returns(uint) {
        return records[_recordId].vitalSigns.temp;
    }

    function getOxygen(uint _recordId) public view returns(uint) {
        return records[_recordId].vitalSigns.oxygen;
    }

    function getPulserate(uint _recordId) public view returns(uint) {
        return records[_recordId].vitalSigns.pulserate;
    }

    function getDiagonsis(uint _recordId) public view returns(string memory) {
        return records[_recordId].diagonsis;
    }

    function getSymptoms(uint _recordId) public view returns(string memory) {
        return records[_recordId].symptoms;
    }

    function getMedicine(uint _recordId) public view returns(string memory) {
        return records[_recordId].medicine;
    }

    function getRemarks(uint _recordId) public view returns(string memory) {
        return records[_recordId].remarks;
    }

    function getDeleted(uint _recordId) public view returns(bool) {
        return isDeleted[_recordId];
    }
}