export class Collider {
    constructor(public x: number, public y: number, public width: number, public height: number) {}

    // Check if this collider is colliding with another collider
    isCollidingWith(other: Collider): boolean {
        // console.log('checking collision');
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
}