import { mongooseConnect } from "@/lib/mongoose";
import { Madrasa } from "@/models/Madrasa";
import { Programme } from "@/models/Programmes";
import { Registrations } from "@/models/Registrations";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='PUT'){
        console.log("put Working2");
        const {id, results} = req.body;
        const updateMadrasaPoints = async (results,multi) => {
          let mark = 5;
        
          for (const result of results) {
            try {
              const registration = await Registrations.findOne({ code: result });
              console.log(registration);
              if (registration) {
                const madrasa = registration.madrasa;
                var category = registration.category;
                if(category==="Sub Junior"){
                  category="SubJunior";
                }
                console.log('mark'+mark);
                await Madrasa.updateOne(
                  { madrasa: madrasa },
                  { $inc: { [`point.${category}`]: multi*mark } },
                  { new: true }
                );
                }
        
              mark -= 2;
            } catch (error) {
              // Handle errors
              console.error(`Error updating Madrasa points for result ${result}: ${error.message}`);
            }
          }
        };

        const updateStudentPoints = async (results,multi) => {
          let mark = 5;
        
          for (const result of results) {
            try {
                console.log('mark'+mark);
               await Registrations.updateOne(
                  { code: result },
                  { $inc: { 'point': multi*mark } },
                  { new: true }
                );
                mark -= 2;
            } catch (error) {
              // Handle errors
              console.error(`Error updating Madrasa points for result ${result}: ${error.message}`);
            }
          }
        };

        const updateStudentsPoints = async (results,multi) => {
          let mark = 5;
        
          for (const result of results) {
            try {
              const registration = await Registrations.findOne({ code: result });
              console.log(registration);
              if (registration) {
                const madrasa = registration.madrasa;
              
                console.log('mark'+mark);
                const regsss= await Registrations.find(
                  { madrasa: madrasa, 'programme.programme': id}
                  );
                  console.log(regsss);
               await Registrations.updateMany(
                  { madrasa: madrasa, 'programme.programme': id},
                  { $inc: { 'point': multi*mark } },
                  { new: true }
                );
               }
                mark -= 2;
               
            } catch (error) {
              // Handle errors
              console.error(`Error updating Madrasa points for result ${result}: ${error.message}`);
            }
          }
        };

        const programmeCheck=await Programme.findOne({_id:id})
        console.log(programmeCheck);
        if(programmeCheck.results.length === 0){
          updateMadrasaPoints(results,1);
          if(programmeCheck.group){
            updateStudentsPoints(results,1);
          }else{
            updateStudentPoints(results,1);
          }
          
          var programmeResultDoc = await Programme.updateOne({_id:id},{results:results});
        }else{
          if(programmeCheck.group){
            updateStudentsPoints(programmeCheck.results,-1)
            updateStudentsPoints(results,1)
          }else{
            updateStudentPoints(programmeCheck.results,-1);
            updateStudentPoints(results,1);
          }
          updateMadrasaPoints(programmeCheck.results,-1);
          updateMadrasaPoints(results,1);
          
          programmeResultDoc = await Programme.updateOne({_id:id},{results:results});
        }

      res.json({_id:id});
      console.log(req.body);
    }
}
