import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {RestEntityDescriptor} from '../../projects/angulorm/src/lib/domain/descriptors';
import {AbstractRestEntity} from '../../projects/angulorm/src/lib/domain/entities';

@Entity<RestEntityDescriptor>(new RestEntityDescriptor('Test', '/testurl'))
export class TestEntity extends AbstractRestEntity {
  public title: string;
}
