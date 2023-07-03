import App from "./src/app.js";

const app = new App(process.env.PORT)


async function main(){
   try {
    await app.start()
   } catch (error) {
    console.log(error);
    
   }

}

main()