const updateClubComponent = async (clubComponent, Model, sequelizeWhereOption) => {
        if(clubComponent){
            console.log("KEYYYYYYYYYYYY", clubComponent, Model)
        return await Model.update(clubComponent, sequelizeWhereOption)
    }
  }

  module.exports = {
      updateClubComponent
  };
  