#!/bin/bash

mode=$1

function build_boilerplate(){
    

    project_name="boilerplate"

    cd client/
    echo -e "installing $project_name client code as user $(whoami)..."
    
    npm install --legacy-peer-deps
    
    echo -e "$project_name client code installation done with --legacy-peer-deps flag"

    echo -e "compiling $project_name client code as user $(whoami)..."
    
    npm run build

    echo -e "$project_name client code compilation done"

    if [ "$mode" == "prod" ]; 
    then 
        npm prune --production 
    fi

    cd ../server/

    echo -e "installing $project_name server code as user $(whoami)..."
    
    npm install --legacy-peer-deps
    
    echo -e "$project_name server code installation done"

    echo -e "compiling $project_name server code as user $(whoami)..."
    
    npm run build
    
    echo -e "$project_name server code compilation done"

    if [ "$mode" == "prod" ]; 
    then 
        npm prune --production 
    fi

}


build_boilerplate
