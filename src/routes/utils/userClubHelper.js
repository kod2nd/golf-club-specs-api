const { Club, Shaft, Grip } = require("../../config/sequelizeConfig");
const { updateClubComponent, DELETE_MESSAGE_SUCCESS } = require("./utils");

const createUserClub = () => {
  return async (req, res, next) => {
    const { shaft, grip } = req.body;

    const club = await Club.create(req.body);
    await Shaft.findOrCreate({ where: { ...shaft, clubId: club.id } });
    await Grip.findOrCreate({ where: { ...grip, clubId: club.id } });

    const clubWithShaftAndGrip = await Club.findOne({
      where: { id: club.id },
      include: [Shaft, Grip]
    });
    res.status(201).json(clubWithShaftAndGrip);
  };
};

const editUserClub = () => {
  return async (req, res, next) => {
    const { shaft, grip, ...restOfClubSpecs } = req.body;
    const { clubId, userId } = req.params;
    const clubLocater = {
      where: { id: clubId, userId }
    };
    const componentLocater = { where: { clubId } };

    await Club.update(restOfClubSpecs, clubLocater);
    await updateClubComponent(shaft, Shaft, componentLocater);
    await updateClubComponent(grip, Grip, componentLocater);

    const updatedClub = await Club.findOne({
      ...clubLocater,
      include: [Shaft, Grip]
    });
    res.status(200).json(updatedClub);
  };
};

const deleteClub = () => {
  return async (req, res, next) => {
    await Club.destroy({ where: { id: req.params.clubId } });
    res.status(200).json({ message: DELETE_MESSAGE_SUCCESS });
  };
};

module.exports = {
  createUserClub,
  editUserClub,
  deleteClub
};
