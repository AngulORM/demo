import {Entity} from '../../projects/angulorm/src/lib/decorators/entity.decorator';
import {RestEntityDescriptor} from '../../projects/angulorm/src/lib/domain/descriptors';
import {AbstractRestEntity} from '../../projects/angulorm/src/lib/domain/entities';

@Entity<RestEntityDescriptor>({
    class: TestEntity,
    name: 'Test',
    route: '/testurl'
})
export class TestEntity extends AbstractRestEntity {
  public title: string;
}
