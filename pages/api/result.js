import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { Registrations } from "@/models/Registrations";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

  if (method === "PUT") {
    try {
      const { category } = req.body;
  
      // Fetch programmes and registrations based on the provided category
      const programmes = await Programme.find({ category: category });
      const registrations = await Registrations.find({ category: category });
  
      let resultsArray = [];
      let madrasaArray = [{madrasa:'Manarulhuda Madrasa Kadannamanna', point:0},{madrasa:'Ansarul Islam Mankooth', point:0},{madrasa:'Najatul Anam Karkkidakam', point:0},{madrasa:'AlMadrasathul Islamiyya Manjerithode', point:0},{madrasa:'Nusrathul Islam Mukkilcheriyam', point:0},{madrasa:'Misbahul Uloom Karimbanakkund', point:0},{madrasa:'Thahleemusibyan Verumpilakkal', point:0},{madrasa:'Ihyaudheen Kadannamanna', point:0},{madrasa:'ABC Madrasa', point:0},];
      let madrasaGroupArray = [{madrasa:'Manarulhuda Madrasa Kadannamanna', point:0, programmes:[]},{madrasa:'Ansarul Islam Mankooth', point:0, programmes:[]},{madrasa:'Najatul Anam Karkkidakam', point:0, programmes:[]},{madrasa:'AlMadrasathul Islamiyya Manjerithode', point:0, programmes:[]},{madrasa:'Nusrathul Islam Mukkilcheriyam', point:0, programmes:[]},{madrasa:'Misbahul Uloom Karimbanakkund', point:0, programmes:[]},{madrasa:'Thahleemusibyan Verumpilakkal', point:0, programmes:[]},{madrasa:'Ihyaudheen Kadannamanna', point:0, programmes:[]}, {madrasa:'ABC Madrasa', point:0, programmes:[]},];

      registrations?.forEach((reg) => {
        let point = 0;
        let mark=0;
  
        reg?.programme?.forEach((pro) => {
          switch (pro?.attendance) {
            case "A":
              point += 5;
              mark=5;
              break;
            case "B":
              point += 3;
              mark=3;
              break;
            case "C":
              point += 1;
              mark=1;
              break;
              case "":
                point += 0;
                mark=0;
                break;
            default:
              break;
          }

          if(pro?.programme && pro?.attendance){
            if(programmes.find(obj=>''+obj._id===pro.programme)?.group){
              console.log('it is a group programme of'+reg.code);
              const resultObjectToUpdateMadrasa2 = madrasaGroupArray.find(
                (result) => result?.madrasa === reg?.madrasa
              );

              if(resultObjectToUpdateMadrasa2?.programmes.includes(pro.programme)){
                console.log('programme already updated' + reg.code);
              }else{
                console.log('programme not updated for' + reg.code);
                if (resultObjectToUpdateMadrasa2) {
                resultObjectToUpdateMadrasa2.point += mark;
                resultObjectToUpdateMadrasa2.programmes.push(pro.programme);
              }
              }
              
            }else{

              if(resultsArray.find(obj=>obj.code===reg.code)){
                const resultObjectToUpdate11 = resultsArray.find(
                  (result) => result.code === reg.code
                );
        
                if (resultObjectToUpdate11) {
                  resultObjectToUpdate11.point += mark;
                }
              }else{
                resultsArray.push({ code: reg?.code, point: mark });
              }

              const resultObjectToUpdateMadrasa = madrasaArray.find(
                (result) => result?.madrasa === reg?.madrasa
              );
      
              if (resultObjectToUpdateMadrasa) {
                resultObjectToUpdateMadrasa.point += mark;
              }
            }
          }
        });

        });

      programmes?.forEach((prog) => {
        let point1 = 5;
  
        prog.results?.forEach((resu) => {
            const winnerReg=registrations?.find(obj=>obj.code===resu);
            const winnerMadrasa=winnerReg?.madrasa;
          if(prog.group){
            const winnerRegs = registrations.filter(obj => (
              obj?.madrasa === winnerMadrasa &&
              obj?.programme?.some(program => program.programme === '' + prog._id)
            ));
            
            
        }else{
            const resultObjectToUpdate = resultsArray.find(
                (result) => result.code === resu
              );
      
              if (resultObjectToUpdate) {
                resultObjectToUpdate.point += point1;
              }
          }

          
          const resultObjectToUpdateMadrasaa = madrasaArray.find(
            (result) => result?.madrasa === winnerMadrasa
          );
  
          if (resultObjectToUpdateMadrasaa) {
            resultObjectToUpdateMadrasaa.point += point1;
          }
  
          point1 = Math.max(0, point1 - 2); 
        });
      });

      for(let i=0; i<madrasaArray.length; i++){
        madrasaArray[i].point=madrasaArray[i].point+madrasaGroupArray[i].point
      }
  
      const winnersArray=resultsArray.sort((a, b) => b.point - a.point).slice(0, 5);
      const madrasaArraySorted=madrasaArray.sort((a, b) => b.point - a.point);
      res.json({madrasaArraySorted, winnersArray, registrations, programmes});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}
