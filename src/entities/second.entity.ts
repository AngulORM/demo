import { Entity } from 'projects/angular-rest/src/lib/decorators/model.decorator';

@Entity({
    class: SecondEntity,
    name: 'Second',
    route: '/secondurl'
})
export class SecondEntity {
}
