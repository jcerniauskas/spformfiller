import { interfaces } from "inversify";

interface ContainerForTesting extends interfaces.Container {
    bindAndGetSpecificInstance<T>(serviceIdentifier: string | symbol | interfaces.Newable<T>, constructor: new (...args: any[]) => T): T;
    snapshotBindings(actionsDuringSnapshot: () => any): void;
}

export default class ContainerExtensions {
    public static ExtendContainer(container: interfaces.Container): ContainerForTesting {
        container["bindAndGetSpecificInstance"] = <T>(serviceIdentifier: string | symbol | interfaces.Newable<T>, constructor: new (...args: any[]) => T) => {
            if (container.isBound(serviceIdentifier)) {
                container.unbind(serviceIdentifier);
            }
            container.bind<T>(serviceIdentifier).to(constructor);
            return container.get<T>(serviceIdentifier);
        };
        container["snapshotBindings"] = (actionsDuringSnapshot: () => any) => {
            container.snapshot();
            actionsDuringSnapshot();
            container.restore();
        };
        return <ContainerForTesting>container;
    }
}