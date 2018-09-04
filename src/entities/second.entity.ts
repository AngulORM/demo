import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {RestEntityDescriptor} from '../../projects/angulorm/src/lib/domain/descriptors';

@Entity<RestEntityDescriptor>(new RestEntityDescriptor('Second', '/secondurl'))
export class SecondEntity {
}
