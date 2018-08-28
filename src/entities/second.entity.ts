import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {RestEntityDescriptor} from '../../projects/angulorm/src/lib/domain/descriptors';

@Entity<RestEntityDescriptor>({
    class: SecondEntity,
    name: 'Second',
    route: '/secondurl'
})
export class SecondEntity {
}
