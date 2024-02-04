#include "painlessMesh.h"

#define   MESH_PREFIX     "prefix"
#define   MESH_PASSWORD   "password"
#define   MESH_PORT       5555

painlessMesh  mesh;

void receivedCallback( uint32_t from, String &msg ) {
  Serial.printf("startHere: Received from %u msg=%s\n", from, msg.c_str());
}

void newConnectionCallback(uint32_t nodeId) {
  Serial.printf("New Connection, nodeId = %u\n", nodeId);
}
void setup() {
  Serial.begin(9600);

//mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages

  mesh.init( MESH_PREFIX, MESH_PASSWORD, MESH_PORT );
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  // Serial.println("My NodeId: " + mesh.getNodeId());
}

void loop() {
  mesh.update();
  
}
