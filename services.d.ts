declare interface Paginated<T> {
  page: number;
  pages: number;
  results: number;
  data: T[];
}

declare namespace Linode {
  interface Instance {
    id: number;
    alerts: LinodeAlerts;
    backups: LinodeBackups;
    created: string;
    region: string;
    image: string | null;
    group?: string;
    ipv4: string[];
    ipv6: string;
    label: string;
    type: null | string;
    status: LinodeStatus;
    updated: string;
    hypervisor: Hypervisor;
    specs: LinodeSpecs;
    watchdog_enabled: boolean;
    tags: string[];
  }

  interface LinodeAlerts {
    cpu: number;
    io: number;
    network_in: number;
    network_out: number;
    transfer_quota: number;
  }

  type Hypervisor = 'kvm' | 'zen';

  type LinodeStatus = 'offline' | 'booting' | 'running' | 'shutting_down' | 'rebooting' | 'provisioning' | 'deleting' | 'migrating';

  interface LinodeSpecs {
    disk: number;
    memory: number;
    vcpus: number;
    transfer: number;
  }

  /** Backups */
  interface LinodeBackups {
    enabled?: boolean;
    schedule: LinodeBackupSchedule;
    last_backup?: LinodeBackup;
    snapshot?: LinodeBackup;
  }

  type Window = "Scheduling" | "W0" | "W2" | "W4" | "W8" | "W10" | "W12" | "W14" | "W16" | "W18" | "W20" | "W22";

  type Day = "Scheduling" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

  interface LinodeBackupSchedule {
    window: Window | null;
    day: Day | null;
  }

  interface LinodeBackupDisk {
    size: number;
    label: string;
    filesystem: string;
  }

  interface LinodeBackup {
    id: number;
    label: string | null;
    status: LinodeBackupStatus;
    type: LinodeBackupType;
    region: string;
    created: string;
    updated: string;
    finished: string;
    configs: string[];
    disks: LinodeBackupDisk[];
    /**
     * @todo Waiting on API to clarify as this is documented as an ENUM.
     */
    availability?: string;
  }

  type LinodeBackupType = 'auto' | 'snapshot';

  type LinodeBackupStatus =
    'pending'
    | 'running'
    | 'needsPostProcessing'
    | 'successful'
    | 'failed'
    | 'userAborted';
}
