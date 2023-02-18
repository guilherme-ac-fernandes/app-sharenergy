export const crudUsers = [
  {
    _id: '63c981512475913e802f7e46',
    name: 'Harry Potter',
    email: 'harry_potter@wizard.com',
    phoneNumber: '(31) 989898987',
    address: '4 Privet Drive, Little Whinging, Surrey',
    cpf: 56798723422,
  },
  {
    _id: '63c9816d2475913e802f7e49',
    name: 'Ronald Weasley',
    email: 'w-ronald@wizard.com',
    phoneNumber: '(31) 945496788',
    address: 'The Burrow, Ottery Catchpole, Devon',
    cpf: 90545683294,
  },
  {
    _id: '63c981902475913e802f7e4c',
    name: 'Hermione Granger',
    email: 'hermione@wizard.com',
    phoneNumber: '(31) 977853700',
    address: '8 Heathgate, Hampstead Garden Suburb, London',
    cpf: 67563917642,
  },
];

export const newCrudUsers = {
  _id: '63c98190e477713e80cf7540',
  name: 'Luna Lovegood',
  email: 'llove-good@wizard.com',
  phoneNumber: '(31) 954800800',
  address: 'Ottery St Catchpole, Devon, England, Great Britain',
  cpf: 55673353212,
};

export const updateCrudUser = {
  ...crudUsers[0],
  name: 'Harry "The Chosen One" Potter',
};

export const updatecrudUsers = [updateCrudUser, crudUsers[1], crudUsers[2]];
