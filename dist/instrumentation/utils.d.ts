export declare const is: {
    instrumented: boolean;
};
export declare function convertSeverityTextToNumber(severityText: string | undefined): 1 | 5 | 9 | 13 | 17 | 21 | undefined;
export declare function convertSeverityValuesToLevel(severityNumber: number | undefined, severityText?: string | undefined): string;
export declare function getCallerInfo(frameDepth: number): {
    filePath?: string;
    lineNum?: number;
    caller?: string;
};
export declare function emitOtelLog({ level, body, severityNumber, attributes, stackDepth, }: {
    level: string;
    body: any;
    severityNumber?: number;
    attributes?: Record<string, any>;
    stackDepth?: number;
}): void;
