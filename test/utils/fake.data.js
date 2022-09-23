import DataGenerator from './/data-generator';

class FakeData {
    get userNameFake(){ return `Kolisya${DataGenerator.generateRandomString()}` }
    get passwordFake(){ return '5Kk1@555' }
}

export default new FakeData();