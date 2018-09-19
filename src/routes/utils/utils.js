const DELETE_MESSAGE_SUCCESS = "Sucessful Delete!"

const updateClubComponent = async (clubComponent, Model, sequelizeWhereOption) => {
        if(clubComponent){
        return await Model.update(clubComponent, sequelizeWhereOption)
    }
  }

  module.exports = {
      updateClubComponent,
      DELETE_MESSAGE_SUCCESS
  };
  