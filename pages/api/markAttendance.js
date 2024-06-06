import { mongooseConnect } from "@/lib/mongoose";
import { Madrasa } from "@/models/Madrasa";
import { Registrations } from "@/models/Registrations";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='PUT'){
        console.log("put Working2");
        const {attendance, programme, _id} = req.body;
        const registration = await Registrations.findOne({ _id: _id });
        const registerResultDoc = await Registrations.updateOne({_id:_id, 'programme.programme':programme},{
          $set: {
            'programme.$.attendance': attendance,
          },
        },
        );
        const updateMadrasaPoints = async (_id,attendance,multi) => {
          
          const mark = getMark(attendance);
          console.log(_id+'mark'+mark);
            try {
              
              if (registration) {
                const madrasa = registration.madrasa;
                var category = registration.category;
                if(category==="Sub Junior"){
                  category="SubJunior";
                }
                await Madrasa.updateOne(
                  { madrasa: madrasa },
                  { $inc: { [`point.${category}`]: multi*mark } },
                );

                /*if(!updatedMadrasa){
                  await Madrasa.findOneAndUpdate(
                    { madrasa: madrasa },
                    { $inc: { [`point.${category}`]: multi*mark } },
                    { new: true }
                  );  
                }

                if(!updatedPoint){
                  await Registrations.findOneAndUpdate(
                    { _id: _id },
                    { $inc: { 'point': multi*mark } },
                    { new: true }
                  );
                }
        
                if (!updatedMadrasa || !updatedPoint) {
                  console.log('error ind');
                }*/
              }
        
            } catch (error) {
              // Handle errors
              console.error(`Error updating Madrasa points for result ${result}: ${error.message}`);
            }         
        };

        const updateStudentPoints = async (_id,attendance,multi) => {
          
          const mark = getMark(attendance)
          console.log(_id+'mark'+mark);
            try {
              
              if (registration) {               
                await Registrations.updateOne(
                  { _id: _id },
                  { $inc: { 'point': multi*mark } },
                );
              }
        
            } catch (error) {
              // Handle errors
              console.error(`Error updating Madrasa points for result ${result}: ${error.message}`);
            }         
        };

        function getMark(attendance) {
          switch (attendance) {
            case 'A':
              return 5;
            case 'B':
              return 3;
            case 'C':
              return 1;
            default:
              return 0;
          }
        }

        const programmeCheck=registration.programme.find(obj=>obj.programme===programme)
        console.log(programmeCheck.attendance);
        if(programmeCheck.attendance === ''){
          updateMadrasaPoints(_id,attendance,1);
          updateStudentPoints(_id,attendance,1);
        }else{
          updateStudentPoints(_id,programmeCheck.attendance,-1);
          updateStudentPoints(_id,attendance,1);
          updateMadrasaPoints(_id,programmeCheck.attendance,-1);
          updateMadrasaPoints(_id,attendance,1);
        }
      res.json({attendance,_id});
      console.log(req.body);
    }
}
