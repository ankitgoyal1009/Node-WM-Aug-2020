const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
    console.log("Master Node")
    const cpu_count = os.cpus().length;

    for (let i = 0; i < cpu_count; i++) {
        cluster.fork();    
    }

}
else{

    //console.log("Node....");
    require('./rest-server');
}
