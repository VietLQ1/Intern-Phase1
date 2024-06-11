export class Matrix4 {

    private _data: number[] = [];

    /** Creates a new matrix 4x4. Marked as private to enforce the use of static methods. */
    private constructor() {
        this._data = [
            1.0, 0, 0, 0,
            0, 1.0, 0, 0,
            0, 0, 1.0, 0,
            0, 0, 0, 1.0
        ];
    }

    /** Returns the data contained in this matrix as an array of numbers. */
    public get data(): number[] {
        return this._data;
    }

    /** Creates and returns an identity matrix. */
    public static identity(): Matrix4 {
        return new Matrix4();
    }
    public static orthographic( left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number ): Matrix4 {
        let m = new Matrix4();

        let lr: number = 1.0 / ( left - right );
        let bt: number = 1.0 / ( bottom - top );
        let nf: number = 1.0 / ( nearClip - farClip );

        m._data[0] = -2.0 * lr;

        m._data[5] = -2.0 * bt;

        m._data[10] = 2.0 * nf;

        m._data[12] = ( left + right ) * lr;
        m._data[13] = ( top + bottom ) * bt;
        m._data[14] = ( farClip + nearClip ) * nf;

        return m;
    }
    public static translation( position: [number, number, number] ): Matrix4 {
        let m = new Matrix4();

        m._data[12] = position[0];
        m._data[13] = position[1];
        m._data[14] = position[2];

        return m;
    }
}
