#include "painlessMesh.h"

#define   MESH_PREFIX     "prefix"
#define   MESH_PASSWORD   "password"
#define   MESH_PORT       5555

painlessMesh  mesh;

void receivedCallback( uint32_t from, String &msg ) {
  Serial.printf("Received from %u msg=%s\n", from, msg.c_str());
}

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600);

//mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages

  mesh.init( MESH_PREFIX, MESH_PASSWORD, MESH_PORT );

  mesh.onReceive(&receivedCallback);
}

void loop() {
  mesh.update();
  if (Serial2.available()){
    String msg = "From ";
    msg += mesh.getNodeId();
    msg += "  ";
    msg += Serial2.readString();
    Serial.println(msg);
    mesh.sendBroadcast(msg);
  }

}
