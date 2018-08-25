import { Entity } from 'projects/angular-rest/src/lib/decorators/model.decorator';

@Entity({
    class: TestEntity,
    name: 'Test',
    route: '/testurl'
})
export class TestEntity {
}
