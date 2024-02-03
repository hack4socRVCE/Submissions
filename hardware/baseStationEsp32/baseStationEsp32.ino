#include "painlessMesh.h"

#define MESH_PREFIX "prefix"
#define MESH_PASSWORD "password"
#define MESH_PORT 5555

painlessMesh mesh;

// Needed for painless library
void receivedCallback(uint32_t from, String &msg) {
  Serial.printf("startHere: Received from %u msg=%s\n", from, msg.c_str());
  Serial.println("Send to pi");
}

void newConnectionCallback(uint32_t nodeId) {
  Serial.printf("--> startHere: New Connection, nodeId = %u\n", nodeId);
}

void changedConnectionCallback() {
  Serial.printf("\nChanged connections\n");
  std::list<uint32_t> nodeList = mesh.getNodeList();

  Serial.print("Number of nodes: " );
  Serial.println(nodeList.size());
  Serial.print("Nodes: ");
  while(nodeList.size() != 0){
    Serial.print(nodeList.front());
    Serial.print(", ");
    nodeList.pop_front();
  }
  Serial.println("Connection topology");
  Serial.println(mesh.subConnectionJson(1));
}


void setup() {
  Serial.begin(9600);

  //mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes(ERROR | STARTUP);  // set before init() so that you can see startup messages

  mesh.init(MESH_PREFIX, MESH_PASSWORD, MESH_PORT);
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);

  Serial.println("Base station start");
  std::list<uint32_t> nodeList = mesh.getNodeList();

  Serial.println(nodeList.size());



  Serial.println(" ");
}

void loop() {
  mesh.update();
}
